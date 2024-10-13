import { connectDevice } from "~/actions/whatsapp";
import Image from "next/image";
import Link from "next/link";

export default async function ConnectPage({
  params,
}: {
  params: { userId: string };
}) {
  const base64QRCode = await connectDevice({ userId: params.userId });

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

      {base64QRCode ? (
        <div className="flex items-center justify-center rounded-xl border border-primary p-8">
          <div className="flex items-center justify-center rounded-lg bg-white p-4">
            <Image
              src={base64QRCode}
              alt="WhatsApp Login QR Code"
              width={256}
              height={256}
            />
          </div>
        </div>
      ) : (
        <p>Failed to generate QR code. Please try again.</p>
      )}

      <Link href="/dashboard">
        <button className="rounded-lg bg-primary px-6 py-3 text-lg transition-all hover:brightness-125">
          Done
        </button>
      </Link>
    </div>
  );
}
