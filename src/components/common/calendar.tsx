import { Box } from "@chakra-ui/react";
import { FC } from "react";
import ReactCalendar from "react-calendar";

type CalendarProps = {
  eventDates: string[];
  onDateClick: (date: Date) => void;
};

const Calendar: FC<CalendarProps> = ({ eventDates, onDateClick }) => {
  return (
    <Box>
      <ReactCalendar
        view="month"
        onClickDay={onDateClick}
        formatDay={(_locale, date) =>
          Intl.DateTimeFormat("en-NG", { day: "2-digit" }).format(date)
        }
        formatShortWeekday={(_locale, date) =>
          Intl.DateTimeFormat("en-NG", { weekday: "narrow" }).format(date)
        }
        tileContent={({ date, view }) =>
          view == "month" &&
          eventDates.includes(date.toISOString().split("T")[0]) ? (
            <Box
              w="6px"
              h="6px"
              borderRadius="50%"
              className="active-dot"
              mx="auto"
              mt={1}
            />
          ) : null
        }
      />
    </Box>
  );
};

export default Calendar;
