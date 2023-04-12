import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";

type RemitaInlineData = {
  key: string;
  transactionId?: string;
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  amount: number;
  narration: string;
  processRrr?: boolean;
  extendedData?: {
    customFields?: { name?: string; value?: string }[];
  };
};

type RemitaInlineProps = {
  data: RemitaInlineData;
  isLive: boolean;
  className?: string;
  text?: string;
  onSuccess: (response: any) => void;
  onError: (response: any) => void;
  onClose: () => void;
};

const RemitaInline = forwardRef(function RemitaInline(
  props: RemitaInlineProps,
  ref: ForwardedRef<HTMLButtonElement | null>
) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const src = !props.isLive
      ? "https://remitademo.net/payment/v1/remita-pay-inline.bundle.js"
      : "https://login.remita.net/payment/v1/remita-pay-inline.bundle.js";

    const script = document.createElement("script");
    script.src = src;
    script.async = true;

    const onScriptLoad = () => {
      setIsLoaded(true);
      setError(false);
    };

    const onScriptError = () => {
      setIsLoaded(true);
      setError(true);
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

      setIsLoaded(false);
      setError(false);
    };
  }, [props.isLive]);

  const startPayment = useCallback(() => {
    if (isLoaded) {
      const payload = {
        ...props.data,
        onSuccess: props.onSuccess,
        onError: props.onError,
        onClose: props.onClose,
      };

      // @ts-ignore
      var paymentEngine = RmPaymentEngine.init(payload);
      paymentEngine.showPaymentWidget();
    }
  }, [isLoaded, props.data, props.onClose, props.onError, props.onSuccess]);

  return (
    <button
      onClick={startPayment}
      className={props.className}
      disabled={!isLoaded || error}
      ref={ref}
    >
      {props.text || "Pay"}
    </button>
  );
});

export default RemitaInline;
