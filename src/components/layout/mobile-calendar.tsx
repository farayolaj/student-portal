import { Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { IoCalendarOutline } from "react-icons/io5";
import EventCalendar from "../common/event-calendar";

export default function MobileCalendar() {
  return (
    <Menu>
      <MenuButton>
        <IoCalendarOutline size="2rem" />
      </MenuButton>
      <MenuList boxShadow="md">
        <EventCalendar />
      </MenuList>
    </Menu>
  );
}
