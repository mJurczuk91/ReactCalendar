import DatepickerDashboard from "./components/datepicker-dashboard";
import DatepickerNavbar from "./components/datepicker-navbar";

const Datepicker: React.FC = () => {
    return <div>
        <DatepickerNavbar />
        <DatepickerDashboard />
    </div>
}

export default Datepicker;