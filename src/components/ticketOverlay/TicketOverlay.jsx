import "./TicketOverlay.scss";

export default function TicketOverlay() {
  return (
    <div className="getTicketOverlay" onClick={()=>{window.open("https://www.tickettailor.com/events/nusentrepreneurshipsociety/1052109/o/35d5891")}}>
      <i className="fas fa-ticket-alt"></i>
    </div>
  );
}
