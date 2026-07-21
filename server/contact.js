import { AgentMailClient } from "agentmail";

const RECIPIENT = "ghostnether28@gmail.com";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const text = (value) => String(value ?? "").trim();

const client = new AgentMailClient({
  apiKey: process.env.AGENTMAIL_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Método não permitido",
    });
  }

  const {
    name,
    email,
    service,
    budget,
    message,
    honey,
  } = req.body ?? {};

  // Honeypot
  if (honey) {
    return res.status(200).json({ success: true });
  }

  const senderName = text(name);
  const senderEmail = text(email);
  const senderMessage = text(message);

  if (!senderName || !senderEmail || !senderMessage) {
    return res.status(400).json({
      success: false,
      error: "Campos obrigatórios",
    });
  }

  if (!EMAIL_PATTERN.test(senderEmail)) {
    return res.status(400).json({
      success: false,
      error: "E-mail inválido",
    });
  }

  if (
    !process.env.AGENTMAIL_API_KEY ||
    !process.env.AGENTMAIL_INBOX
  ) {
    return res.status(503).json({
      success: false,
      error: "AgentMail não configurado.",
    });
  }

  try {
    const html = `
      <h2>Novo orçamento</h2>

      <p><strong>Nome:</strong> ${escapeHtml(senderName)}</p>

      <p><strong>Email:</strong> ${escapeHtml(senderEmail)}</p>

      <p><strong>Serviço:</strong> ${escapeHtml(
        text(service) || "-"
      )}</p>

      <p><strong>Orçamento:</strong> ${escapeHtml(
        text(budget) || "-"
      )}</p>

      <hr>

      <p>${escapeHtml(senderMessage).replace(/\n/g, "<br>")}</p>
    `;

    const sentMessage =
      await client.inboxes.messages.send(
        process.env.AGENTMAIL_INBOX,
        {
          to: RECIPIENT,
          subject: `Novo orçamento - ${senderName}`,
          text: `
Nome: ${senderName}

Email: ${senderEmail}

Serviço: ${text(service) || "-"}

Orçamento: ${text(budget) || "-"}

Mensagem:

${senderMessage}
          `,
          html,
          labels: ["portfolio", "contato"],
        }
      );

    console.log("Mensagem enviada:", sentMessage.id);

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return res.status(502).json({
      success: false,
      error: "Falha ao enviar e-mail.",
    });
  }
}
