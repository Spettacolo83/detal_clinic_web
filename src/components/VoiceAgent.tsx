"use client";

import Script from "next/script";
import { useLocale } from "next-intl";

const AGENT_IDS: Record<string, string> = {
  it: "agent_1601kvghw00cebza3kbrm3843mgr",
  es: "agent_8301kvghw1btfbg8bp2ysv0e8j2j",
  en: "agent_6701kvghw2vrejytxnmz0gr4pkqd",
};

const TIMEZONE_BY_LOCALE: Record<string, string> = {
  it: "Europe/Rome",
  es: "Europe/Madrid",
  en: "Europe/London",
};

export default function VoiceAgent() {
  const locale = useLocale();
  const agentId = AGENT_IDS[locale] ?? AGENT_IDS.en;
  const tz = TIMEZONE_BY_LOCALE[locale] ?? TIMEZONE_BY_LOCALE.en;
  if (!agentId || agentId.startsWith("AGENT_ID_PLACEHOLDER")) return null;

  const dynamicVars = JSON.stringify({ agent_lang: locale, agent_tz: tz });

  return (
    <>
      <elevenlabs-convai
        agent-id={agentId}
        dynamic-variables={dynamicVars}
        key={agentId}
      />
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
        async
      />
    </>
  );
}
