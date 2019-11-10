/**
 * Listview(pull down refresh、pull up load more)
 * 1. dataSource
 * 2. Item
 * 3. onRefresh
 * 4. onEndReached
 * 5. fnLink
 * 6. useBodyScroll
 */
import * as React from "react";
import List from "./List";
import "./style";

class Listview extends React.PureComponent {
    constructor(props: any) {
        super(props);
        this.state = { height: null };
        this.ref = React.createRef();
    }

    componentDidMount() {
        // console.log("did", this.ref.current.offsetTop);
        // parent container offsetTop
        this.setState({ height: this.ref.current.offsetTop });
    }

    render() {
        return (
            <div ref={this.ref}>
                <List {...this.props} height={this.state.height} />
            </div>
        );
    }
}

export default Listview;
