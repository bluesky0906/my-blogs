import React from "react";
import marked from "marked";

type PreviewProps = {
    data: string;
}
type PreviewState = {
}
class Preview extends React.Component<PreviewProps, PreviewProps> {
    render() {
        return (
            <div id="preview">
                <span dangerouslySetInnerHTML={{ __html: marked(this.props.data) }} />
            </div>
        )
    }
}

export default Preview;