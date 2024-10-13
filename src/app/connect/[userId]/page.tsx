import { QRCode } from "./qr-code";
import { StatusButton } from "./status-button";

export default async function ConnectPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-10">
      <div className="flex flex-col items-center justify-center gap-y-2 text-white">
        <h1 className="text-center text-2xl font-semibold">
          To connect to the dashboard
        </h1>
        <h1 className="text-center text-2xl font-semibold">
          scan this <span className="text-primary">QR Code</span>
        </h1>
      </div>

      <QRCode userId={userId} />

      <StatusButton userId={userId} />
    </div>
  );
}
