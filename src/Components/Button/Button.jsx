import "./button.css";
export const CustomButton = ({borderColor, label, onClick, hoverColor}) => {
    return (
        <button className="custom-button" style={{borderColor, "--hover-color": hoverColor}} onClick={onClick}>{label}</button>
    )
}