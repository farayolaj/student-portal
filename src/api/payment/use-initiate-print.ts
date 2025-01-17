import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import getApi from "../api";

export const useInitiatePrint = () => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast({
        isClosable: true,
    });

    const initiatePrint = async ({ rrr }: { rrr: string }) => {
        setIsLoading(true);
        try {
            const response = await getApi().get(
                `/mainreceipt?rrr_code=${encodeURIComponent(rrr)}`, 
                { responseType: "blob" }
            );
            
            const fileName = response.headers["content-disposition"]
                ?.split("filename=")[1]
                ?.replace(/"/g, "") || "receipt.pdf";
                
            const blobUrl = URL.createObjectURL(
                new Blob([response.data], { type: "application/pdf" })
            );
            
            const anchorElement = document.createElement("a");
            anchorElement.href = blobUrl;
            anchorElement.download = fileName;
            
            anchorElement.click();
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            toast({
                status: "error",
                title: "Error",
                description: "Error fetching receipt",
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { initiatePrint, isLoading };
};