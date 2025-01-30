// components/ToastButtons.tsx

import { Button, HStack } from "@chakra-ui/react"
import { toaster } from "@/components/ui/toaster"

interface ToastButtonsProps {
    types?: string[];
    buttonSize?: "sm" | "md" | "lg";
    variant?: "outline" | "solid" | "ghost" | "subtle" | "surface" | "plain";
}

const ToastButtons = ({
    types = ["success", "error", "warning", "info"],
    buttonSize = "sm",
    variant = "outline",
}: ToastButtonsProps) => {
    return (
        <HStack>
            {types.map((type) => (
                <Button
                    size={buttonSize}
                    variant={variant}
                    key={type}
                    onClick={() =>
                        toaster.create({
                            title: `Toast status is ${type}`,
                            type: type,
                        })
                    }
                >
                    {type}
                </Button>
            ))}
        </HStack>
    )
}

export default ToastButtons
