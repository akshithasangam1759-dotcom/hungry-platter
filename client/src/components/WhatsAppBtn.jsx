import './WhatsAppBtn.css';

export default function WhatsAppBtn() {
  return (
    <a
      href="mailto:hungryplattervisit@gmail.com?subject=Inquiry%20about%20Hungry%20Platter"
      className="email-float"
      title="Email Us"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    </a>
  );
}