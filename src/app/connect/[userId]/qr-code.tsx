"use client";

import { connectDevice } from "~/actions/whatsapp";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

export function QRCode({ userId }: { userId: string }) {
  const [qrCode, setBase64QRCode] = useState("");

  useEffect(() => {
    connectDevice({ userId }).then((base64QRCode) =>
      setBase64QRCode(base64QRCode),
    );
  }, []);
  return (
    <>
      {qrCode ? (
        <div className="flex items-center justify-center rounded-xl border border-primary p-8">
          <div className="flex items-center justify-center rounded-lg bg-white p-4">
            <Image
              src={qrCode}
              alt="WhatsApp Login QR Code"
              width={256}
              height={256}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Oval height="24" width="24" color="#ffffff" />
          Loading QR code for login...
        </div>
      )}
    </>
  );
}
