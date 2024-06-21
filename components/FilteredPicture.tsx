

interface Props {
    imgID: string,
    warningID: string,
    img: string,
    alt?: string,
    source?: string,
    sourceTitle?: string,
}


export default function FilteredPicture({ imgID, warningID, img, alt, source, sourceTitle }: Props) {
    return (
        <>
            <div style={{ width: "fit-content", position: "relative" }}>
                <img id={imgID} src={img} alt={alt} style={{
                    display: "block", width: "15em", 
                    height: "auto", filter: "blur(8px)", 
                    WebkitFilter: "blur(8px)", borderRadius: "10px"
                }} />
                <div id={warningID} style={{ width: "60%", textAlign: "center", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", msTransform: "translate(-50%, -50%)" }}>
                    <small style={{ color: "white" }}>Picture might contain graphical image.</small>
                    <button style={{ width: "fit-content", fontSize: "0.7em" }} onClick={() => {
                        const filteredPicture = document.getElementById(imgID) as HTMLElement;
                        filteredPicture.style.filter = "blur(0px)";
                        const containerWarning = document.getElementById(warningID) as HTMLElement;
                        containerWarning.style.display = "none";
                    }}>View Picture</button>
                </div>
            </div>
            {
                source &&
                <small>Source : <a href={source} target='_blank'>{sourceTitle ? sourceTitle : source}</a></small>
            }
        </>
    )
}