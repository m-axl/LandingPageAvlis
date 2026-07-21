import { Resend } from "resend";

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

export function createContactHandler({ apiKey = process.env.RESEND_API_KEY, sendEmail } = {}) {
  return async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, error: "Método não permitido" });
    }

    const { name, email, service, budget, message, honey } = req.body ?? {};
    if (honey) return res.status(200).json({ success: true });

    const senderName = text(name);
    const senderEmail = text(email);
    const senderMessage = text(message);
    if (!senderName || !senderEmail || !senderMessage) {
      return res.status(400).json({ success: false, error: "Campos obrigatórios" });
    }
    if (!EMAIL_PATTERN.test(senderEmail)) {
      return res.status(400).json({ success: false, error: "E-mail inválido" });
    }
    if (!apiKey) {
      console.error("RESEND_API_KEY não configurada");
      return res.status(503).json({ success: false, error: "Serviço de e-mail indisponível" });
    }

    try {
      const deliver = sendEmail ?? ((payload) => new Resend(apiKey).emails.send(payload));
      const { error } = await deliver({
        from: "Portfolio <onboarding@resend.dev>",
        to: [RECIPIENT],
        replyTo: senderEmail,
        subject: `Novo orçamento - ${senderName}`,
        html: `<h2>Novo orçamento</h2>
          <p><b>Nome:</b> ${escapeHtml(senderName)}</p>
          <p><b>Email:</b> ${escapeHtml(senderEmail)}</p>
          <p><b>Serviço:</b> ${escapeHtml(text(service) || "-")}</p>
          <p><b>Orçamento:</b> ${escapeHtml(text(budget) || "-")}</p>
          <p>${escapeHtml(senderMessage)}</p>`,
      });

      if (error) throw error;
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Erro ao enviar e-mail", error);
      return res.status(502).json({ success: false, error: "Falha ao enviar e-mail" });
    }
  };
}

export default createContactHandler();
