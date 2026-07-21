import assert from "node:assert/strict";
import test from "node:test";
import apiContactHandler from "../api/contact.js";
import { createContactHandler } from "../server/contact.js";

function response() {
  return {
    code: undefined,
    body: undefined,
    status(code) {
      this.code = code;
      return this;
    },
    json(body) {
      this.body = body;
    },
  };
}

const request = (body, method = "POST") => ({ method, body });

test("mantém o adaptador serverless compatível com a Vercel", async () => {
  const res = response();
  await apiContactHandler(request({}, "GET"), res);
  assert.equal(res.code, 405);
});

test("rejeita métodos diferentes de POST", async () => {
  const res = response();
  await createContactHandler({ apiKey: "key" })(request({}, "GET"), res);
  assert.equal(res.code, 405);
});

test("valida os campos obrigatórios e o e-mail", async () => {
  const handler = createContactHandler({ apiKey: "key" });
  const required = response();
  await handler(request({ name: "Ana", email: "ana@example.com" }), required);
  assert.equal(required.code, 400);

  const invalidEmail = response();
  await handler(request({ name: "Ana", email: "inválido", message: "Olá" }), invalidEmail);
  assert.equal(invalidEmail.code, 400);
  assert.equal(invalidEmail.body.error, "E-mail inválido");
});

test("ignora silenciosamente envios do honeypot", async () => {
  let called = false;
  const res = response();
  await createContactHandler({ apiKey: "key", sendEmail: async () => { called = true; } })(
    request({ honey: "bot" }),
    res,
  );
  assert.equal(res.code, 200);
  assert.equal(called, false);
});

test("retorna indisponível sem chave do Resend", async () => {
  const res = response();
  await createContactHandler({ apiKey: "" })(
    request({ name: "Ana", email: "ana@example.com", message: "Olá" }),
    res,
  );
  assert.equal(res.code, 503);
});

test("envia a mensagem sanitizada", async () => {
  let payload;
  const res = response();
  await createContactHandler({
    apiKey: "key",
    sendEmail: async (value) => { payload = value; return { data: { id: "email_123" } }; },
  })(request({
    name: "Ana",
    email: "ana@example.com",
    service: "Site <novo>",
    budget: "R$ 2.000",
    message: "Olá <script>",
  }), res);

  assert.equal(res.code, 200);
  assert.deepEqual(payload.to, ["ghostnether28@gmail.com"]);
  assert.equal(payload.replyTo, "ana@example.com");
  assert.match(payload.html, /&lt;script&gt;/);
});

test("trata erro do provedor de e-mail", async () => {
  const res = response();
  await createContactHandler({
    apiKey: "key",
    sendEmail: async () => ({ error: { message: "Chave inválida" } }),
  })(request({ name: "Ana", email: "ana@example.com", message: "Olá" }), res);
  assert.equal(res.code, 502);
});
