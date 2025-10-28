import React, { useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colors } from "../theme/colors";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export interface CalendarProps {
  onDateSelect?: (dates: Date[]) => void;
}

export function Calendar({ onDateSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const startDay = firstDay.getDay();

    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }

    return {
      year,
      month,
      days,
      daysInMonth,
      daysInPrevMonth,
      startDay,
    };
  }, [currentDate]);

  const handleDatePress = (date: Date): void => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      onDateSelect?.([date]);
    } else {
      if (date < selectedStartDate) {
        setSelectedStartDate(date);
        setSelectedEndDate(null);
        onDateSelect?.([date]);
      } else {
        setSelectedEndDate(date);
        onDateSelect?.([selectedStartDate, date]);
      }
    }
  };

  const isDateSelected = (date: Date): boolean => {
    if (!selectedStartDate) return false;
    if (!selectedEndDate) return date.getTime() === selectedStartDate.getTime();
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  const isDateInRange = (date: Date): boolean => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return date > selectedStartDate && date < selectedEndDate;
  };

  const navigateMonth = (direction: "prev" | "next"): void => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigateMonth("prev")}
          style={styles.navButton}
        >
          <Text style={styles.navButtonText}>‹</Text>
        </Pressable>
        <Text style={styles.monthYear}>
          {months[calendarData.month]} {calendarData.year}
        </Text>
        <Pressable
          onPress={() => navigateMonth("next")}
          style={styles.navButton}
        >
          <Text style={styles.navButtonText}>›</Text>
        </Pressable>
      </View>

      <View style={styles.weekHeader}>
        {days.map((day) => (
          <Text key={day} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.calendarGrid}>
        {calendarData.days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === calendarData.month;
          const isToday = date.toDateString() === new Date().toDateString();
          const isSelected = isDateSelected(date);
          const isInRange = isDateInRange(date);

          return (
            <Pressable
              key={index}
              onPress={() => handleDatePress(date)}
              style={[
                styles.dayButton,
                !isCurrentMonth && styles.dayButtonOtherMonth,
                isToday && styles.dayButtonToday,
                isSelected && styles.dayButtonSelected,
                isInRange && styles.dayButtonInRange,
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  !isCurrentMonth && styles.dayTextOtherMonth,
                  isToday && styles.dayTextToday,
                  isSelected && styles.dayTextSelected,
                  isInRange && styles.dayTextInRange,
                ]}
              >
                {date.getDate()}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.mutedSurface,
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  weekHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  weekDay: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayButton: {
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  dayButtonOtherMonth: {
    opacity: 0.3,
  },
  dayButtonToday: {
    backgroundColor: colors.brandLight,
  },
  dayButtonSelected: {
    backgroundColor: colors.brand,
  },
  dayButtonInRange: {
    backgroundColor: colors.brandLight,
  },
  dayText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textPrimary,
  },
  dayTextOtherMonth: {
    color: colors.textMuted,
  },
  dayTextToday: {
    color: colors.brandDark,
    fontWeight: "700",
  },
  dayTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },
  dayTextInRange: {
    color: colors.brandDark,
  },
});
