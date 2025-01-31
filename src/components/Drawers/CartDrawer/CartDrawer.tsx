"use client";

import {
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
} from "@/components/ui/drawer";
import { useCart } from "@/contexts/CartContext/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface CartDrawerProps {
    isOpenCartDrawer: boolean;
    setIsOpenCartDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartDrawer = ({ isOpenCartDrawer, setIsOpenCartDrawer }: CartDrawerProps) => {
    const { items, totalPrice, updateQuantity, removeItem } = useCart();
    const { showToast } = useToast()

    const handleDecreaseQuantity = (id: string, quantity: number) => {
        if (quantity > 1) {
            updateQuantity(id, quantity - 1);
        } else {
            removeItem(id);
        }
    };

    const handleCheckout = () => {
        showToast("success", {
            title: "Compra finalizada",
        });
    }

    return (
        <DrawerRoot open={isOpenCartDrawer} onOpenChange={(e) => setIsOpenCartDrawer(e.open)}>
            <DrawerBackdrop />
            <DrawerContent>
                <DrawerHeader bg="#009FE3" p={2} fontSize={16}>
                    <DrawerTitle color="white">Carrinho</DrawerTitle>
                </DrawerHeader>
                <DrawerBody px={4}>
                    {items.length === 0 ? (
                        <Text mt={4} textAlign="center">
                            Seu carrinho está vazio.
                        </Text>
                    ) : (
                        <Box>
                            {items.map((item) => (
                                <Flex
                                    key={item.id}
                                    justify="space-between"
                                    align="center"
                                    py={2}
                                    borderBottom="1px solid #E2E8F0"
                                    flexDirection={"column"}
                                >
                                    <Text fontWeight="bold">{item.name}</Text>

                                    <Flex flexDirection={"row"} align="center">
                                        <Text >R$ {item.price.toFixed(2)}</Text>
                                        <Flex align="center">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                colorScheme="blue"
                                                onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                                            >
                                                -
                                            </Button>
                                            <Text px={2}>{item.quantity}</Text>
                                            <Button
                                                size="sm"
                                                colorScheme="blue"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </Button>
                                        </Flex>
                                        <Text>R$ {(item.price * item.quantity).toFixed(2)}</Text>
                                    </Flex>
                                </Flex>
                            ))}
                        </Box>
                    )}
                </DrawerBody>
                <DrawerFooter flexDirection={"column"} justifyContent="space-between">
                    <Text fontWeight="bold" fontSize="lg" px={4}>
                        Total: R$ {totalPrice.toFixed(2)}
                    </Text>
                    <DrawerActionTrigger asChild w={"100%"} bg="#009FE3" color="#fff" fontSize={16} rounded={"0"}>
                        <Button colorScheme="blue" variant="solid" onClick={handleCheckout}>
                            Finalizar Compra
                        </Button>
                    </DrawerActionTrigger>
                </DrawerFooter>
                <DrawerCloseTrigger />
            </DrawerContent>
        </DrawerRoot >
    );
};

export default CartDrawer;
