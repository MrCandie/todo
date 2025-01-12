"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import ViewTodo from "./ViewTodo";
import { useDisclosure } from "@chakra-ui/react";
import { ITodo } from "../../interface";
import { getStoredItem } from "../../utils/lib";
import { listMyTodos } from "../../utils/https";

export default function Calendar() {
  const [id, setId] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [data, setData] = useState<Array<ITodo>>([]);

  useEffect(() => {
    async function fetchData() {
      const user = getStoredItem("user");
      try {
        const response = await listMyTodos(user);
        const eventList = response?.data?.map((el: ITodo) => {
          const date = new Date(el.start_date);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();

          return {
            id: el.id,
            title: el.name,
            start: `${year}-${month.toString().padStart(2, "0")}-${day}`,
            status: el.status,
          };
        });

        setData(eventList);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  function RenderEventContent(e: any) {
    const day = new Date(e.event.startStr).getDate();
    const month = new Date(e.event.startStr).getMonth() + 1;
    const year = new Date(e.event.startStr).getFullYear();
    const status = e?.event?._def?.extendedProps?.status?.toLowerCase();

    let color;
    let bg;
    if (status === "pending") {
      color = "#3A57E8";
      bg = "#EBEEFD";
    } else {
      color = "#1AA053";
      bg = "#D5EBDF";
    }
    return (
      <>
        <div
          onClick={() => {
            setId(e.event.id);
            onOpen();
          }}
          style={{
            backgroundColor: bg,
            width: "100%",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}>
          <p style={{ wordWrap: "break-word", color }}>
            {day}/{month}/{year}
          </p>
          <p
            style={{
              wordWrap: "break-word",
              textTransform: "capitalize",
              color,
            }}>
            {e.event.title}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <ViewTodo isOpen={isOpen} onClose={onClose} id={id} setData={() => {}} />

      <div style={{ width: "100%" }} className="w-full hidden lg:block">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            // right: "dayGridMonth,timeGridWeek",
            right: "prev,next,dayGridMonth",
          }}
          selectable={true}
          selectMirror={true}
          nowIndicator={true}
          eventContent={RenderEventContent}
          events={data}
        />
      </div>
    </>
  );
}
