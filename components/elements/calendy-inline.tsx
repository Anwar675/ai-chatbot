"use client";

import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { useState } from "react";
import { toast } from "../toast";

interface CalendlyInlineProps {
  url: string;
  onClose?: () => void;
}


export function CalendlyInline({ url, onClose }: CalendlyInlineProps) {
  const [height, setHeight] = useState<number>(700);

  useCalendlyEventListener({
    onPageHeightResize: (e) => {
      const rawHeight = e.data.payload.height;

      const parsedHeight =
        typeof rawHeight === "string"
          ? parseInt(rawHeight.replace("px", ""), 10)
          : rawHeight;

      if (typeof parsedHeight === "number" && !Number.isNaN(parsedHeight)) {
        setHeight(parsedHeight);
      }
    },

    onEventScheduled: () => {
      const now = new Date();

      const date = now.toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const time = now.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      });

      toast({
        type: "success",
        title: "🎉 Đặt lịch thành công!",
        description: (
          <div className="mt-2 space-y-1 text-sm">
            <div>🗓 <b>{date}</b></div>
            <div>⏰ <b>{time}</b> (GMT+7)</div>
            <div className="text-muted-foreground">
              CareMe sẽ liên hệ với bạn sớm 💙
            </div>
          </div>
        ),
      });

      onClose?.();
    },
  });

  return (
    <div
      className="w-full"
      style={{
        height: `${height}px`,
        minHeight: "600px",
      }}
    >
      <InlineWidget
        key={url}
        url={url}
        styles={{ height: "100%", width: "100%" }}
        pageSettings={{
          backgroundColor: "ffffff",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "00a2ff", // CareMe color
          textColor: "4d5055",
        }}
      />
    </div>
  );
}
