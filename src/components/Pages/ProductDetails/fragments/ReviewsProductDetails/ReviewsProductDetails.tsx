import { Avatar } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { HStack, Stack, Text } from "@chakra-ui/react";

const ReviewsProductDetails = () => {
    return (
        <div className="flex flex-col gap-4 my-5">
            <h1 className="text-xl font-bold">Principais avaliações</h1>
            <div className="w-full flex gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Stack maxW="100%" gap="4" key={index} borderBottom={1} borderColor={"#ccc"}>
                        <Rating colorPalette="orange" readOnly size="xs" defaultValue={4} />

                        <Text>
                            Sage is a great software engineer. He is very professional and
                            knowledgeable.
                        </Text>

                        <HStack gap="4">
                            <Avatar
                                name="Matthew Jones"
                                src="https://randomuser.me/api/portraits/men/70.jpg"
                            />
                            <Stack textStyle="sm" gap="0">
                                <Text fontWeight="medium">Matthew Jones</Text>
                                <Text color="fg.muted">CTO, Company</Text>
                            </Stack>
                        </HStack>
                    </Stack>
                ))
                }
            </div>

        </div>
    );

};

export default ReviewsProductDetails;
