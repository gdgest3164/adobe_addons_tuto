import React from "react";

interface WCProps {
    [key: string]: any;
    children?: React.ReactNode;
}

export class WC extends React.Component<WCProps> {
    private el: React.RefObject<HTMLDivElement>;

    constructor(props: WCProps) {
        super(props);
        this.el = React.createRef<HTMLDivElement>();
        this.handleEvent = this.handleEvent.bind(this);
    }

    handleEvent(evt: Event) {
        const propName = `on${evt.type[0].toUpperCase()}${evt.type.substring(1)}`;
        if (this.props[propName]) {
            this.props[propName].call(evt.target, evt);
        }
    }

    componentDidMount() {
        const el = this.el.current;
        if (el) {
            const eventProps = Object.entries(this.props).filter(([k]) => k.startsWith("on"));
            eventProps.forEach(([k]) => el.addEventListener(k.substring(2).toLowerCase(), this.handleEvent));
        }
    }

    componentWillUnmount() {
        const el = this.el.current;
        if (el) {
            const eventProps = Object.entries(this.props).filter(([k]) => k.startsWith("on"));
            eventProps.forEach(([k]) => el.removeEventListener(k.substring(2).toLowerCase(), this.handleEvent));
        }
    }

    render() {
        const filteredProps = Object.fromEntries(Object.entries(this.props).filter(([k]) => !k.startsWith("on")));
        return <div ref={this.el} {...filteredProps}>{this.props.children}</div>;
    }
}
