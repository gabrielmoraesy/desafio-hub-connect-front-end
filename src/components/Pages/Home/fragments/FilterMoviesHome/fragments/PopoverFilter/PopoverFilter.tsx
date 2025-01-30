import { Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { ChevronsUpDown } from "lucide-react";
import { Check, X } from "phosphor-react";
import { useState } from "react";

interface ISearchValues {
    value: string
    label: string
}

interface PopoverFilterProps {
    variant: "genre" | "releaseYear" | "duration"
    searchValues: ISearchValues[]
    valueSelected: string
    setValueSelected: React.Dispatch<React.SetStateAction<string>>
}

const PopoverFilter = ({ variant, searchValues, valueSelected, setValueSelected }: PopoverFilterProps) => {
    const [open, setOpen] = useState(false);

    const renderTitleAndPlaceholder = () => {
        switch (variant) {
            case "genre":
                return {
                    title: "Genêro",
                    placeholder: "Pesquise pelo gênero..."
                }
            case "releaseYear":
                return {
                    title: "Ano de lançamento",
                    placeholder: "Pesquise pelo ano de lançamento..."
                }
            case "duration":
                return {
                    title: "Duração",
                    placeholder: "Pesquise pela duração..."
                }
        }
    }

    return (
        <Popover isOpen={open} onClose={() => setOpen(false)}>
            <PopoverTrigger>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open ? "true" : "false"}
                    onClick={() => setOpen(!open)}
                    w="full"
                    justifyContent="space-between"
                >
                    {valueSelected
                        ? searchValues.find((item) => item.value === valueSelected)?.label
                        : renderTitleAndPlaceholder().title}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent w="full" p="0">
                <PopoverArrow />
                <PopoverCloseButton />
                <Menu>
                    <MenuButton as={Button} variant="link" w="full" textAlign="left">
                        {renderTitleAndPlaceholder().placeholder}
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => setValueSelected("")}>
                            <X className="mr-2 h-4 w-4 text-red-500" />
                            Remover filtro
                        </MenuItem>
                        <MenuDivider />
                        {searchValues.map((item) => (
                            <MenuItem
                                key={item.value}
                                onClick={() => {
                                    const newValue = item.value === valueSelected ? "" : item.value;
                                    setValueSelected(newValue);
                                    setOpen(false);
                                }}
                                display="flex"
                                alignItems="center"
                            >
                                <Check
                                    className={`mr-2 h-4 w-4 ${valueSelected === item.value ? "opacity-100" : "opacity-0"}`}
                                />
                                {item.label}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            </PopoverContent>
        </Popover>
    );
};

export default PopoverFilter;
