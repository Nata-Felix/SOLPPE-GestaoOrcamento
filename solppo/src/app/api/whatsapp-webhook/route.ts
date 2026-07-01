import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const webhookUrl = process.env.N8N_WHATSAPP_WEBHOOK_URL;
        if (!webhookUrl) {
            return NextResponse.json(
                { error: "Integração de WhatsApp não configurada" },
                { status: 503 }
            );
        }

        const body = await req.json();

        // Log payload size for debugging
        const payloadStr = JSON.stringify(body);
        console.log(`[whatsapp-webhook] Sending payload to n8n. Size: ${(payloadStr.length / 1024).toFixed(1)}KB`);

        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payloadStr,
        });

        // Read response body regardless of status
        await response.text();
        console.log(`[whatsapp-webhook] n8n response: status=${response.status}`);

        if (response.ok) {
            return NextResponse.json({ ok: true, status: response.status });
        } else {
            return NextResponse.json(
                {
                    error: "n8n webhook error",
                    n8n_status: response.status,
                    detail: "Falha ao processar o envio no serviço de automação",
                },
                { status: 502 }
            );
        }
    } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        console.error("[whatsapp-webhook] Proxy error:", msg);
        return NextResponse.json(
            { error: "Failed to reach webhook", detail: msg },
            { status: 500 }
        );
    }
}
