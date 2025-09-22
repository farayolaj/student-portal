import { useToast } from "@chakra-ui/react";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";

type InitPaymentData = {
  key: string;
  transactionId?: string;
  customerId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  amount?: number;
  narration?: string;
  processRrr?: boolean;
  extendedData?: {
    customFields?: { name?: string; value?: string }[];
  };
};

type RemitaInlineProps = {
  data: InitPaymentData;
  opts: InitPaymentOpts;
  className?: string;
  text?: string;
};

type UseRemitaInlineProps = {
  isLive: boolean;
};

type InitPaymentOpts = {
  onSuccess?: (response: unknown) => void;
  onError?: (response: unknown) => void;
  onClose?: () => void;
};

function useRemitaInline(props: UseRemitaInlineProps) {
  const [sdkStatus, setSdkStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [sdkError, setSdkError] = useState<Error | null>(null);
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (sdkStatus === "error" && sdkError) {
      toast({
        status: "error",
        title: "Error loading payment gateway",
        description: sdkError.message,
      });
    }
  }, [sdkError, sdkStatus, toast]);

  useEffect(() => {
    const src = !props.isLive
      ? "https://remitademo.net/payment/v1/remita-pay-inline.bundle.js"
      : "https://login.remita.net/payment/v1/remita-pay-inline.bundle.js";

    const script = document.createElement("script");
    script.src = src;
    script.async = true;

    const onScriptLoad = () => {
      setSdkStatus("ready");
      setSdkError(null);
    };

    const onScriptError = () => {
      setSdkStatus("error");
      setSdkError(
        new Error("Failed to load Remita Inline SDK. Try again later.")
      );
    };

    script.addEventListener("load", onScriptLoad);
    script.addEventListener("complete", onScriptLoad);
    script.addEventListener("error", onScriptError);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", onScriptLoad);
      script.removeEventListener("complete", onScriptLoad);
      script.removeEventListener("error", onScriptError);

      script.remove();

      setSdkStatus("loading");
      setSdkError(null);
    };
  }, [props.isLive]);

  const initPayment = useCallback(
    (data: InitPaymentData, opts: InitPaymentOpts) => {
      if (sdkStatus === "ready") {
        const payload = {
          ...data,
          onSuccess: (res: unknown) => {
            if (opts.onSuccess) opts.onSuccess(res);
            setTransactionInProgress(false);
          },
          onError: (res: unknown) => {
            if (opts.onError) opts.onError(res);
            setTransactionInProgress(false);
          },
          onClose: () => {
            if (opts.onClose) opts.onClose();
            setTransactionInProgress(false);
          },
        };

        setTransactionInProgress(true);
        // @ts-expect-error RmPaymentEngine is loaded globally by script.
        const paymentEngine = RmPaymentEngine.init(payload);
        paymentEngine.showPaymentWidget();
      }
    },
    [sdkStatus]
  );

  const RemitaInline = forwardRef(function RemitaInline(
    props: RemitaInlineProps,
    ref: ForwardedRef<HTMLButtonElement | null>
  ) {
    return (
      <button
        onClick={() => initPayment(props.data, props.opts)}
        className={props.className}
        disabled={sdkStatus !== "ready"}
        ref={ref}
      >
        {props.text || "Pay"}
      </button>
    );
  });

  return {
    initPayment,
    RemitaInline,
    transactionInProgress,
    sdkStatus,
  };
}

export default useRemitaInline;
