import { Box } from "@chakra-ui/react";
import format from "date-fns/format";
import { FC } from "react";
import ReactCalendar from "react-calendar";
import { DATE_ONLY_FORMAT } from "../../constants/date";

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
        locale="en-NG"
        tileContent={({ date, view }) =>
          view == "month" &&
          eventDates.includes(format(date, DATE_ONLY_FORMAT)) ? (
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
