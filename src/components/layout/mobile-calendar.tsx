import { Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { IoCalendarOutline } from "react-icons/io5";
import EventCalendar from "../common/events/event-calendar";

export default function MobileCalendar() {
  return (
    <Menu>
      <MenuButton display={["unset", null, "none"]}>
        <IoCalendarOutline size="1.5rem" />
      </MenuButton>
      <MenuList boxShadow="md">
        <EventCalendar />
      </MenuList>
    </Menu>
  );
}
