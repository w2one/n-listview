import * as React from "react";
import { hot } from "react-hot-loader";
import { Listview } from "../../src";

function App() {
    const [data, setData] = React.useState({
        page: 1,
        pageSize: 10,
        records: [],
        total: 0,
        pages: 0
    });

    React.useEffect(() => {
        getData(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getData({ }) {
        fetch("http://api.shanghaim.net/mock/28/api/message/list", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ page: 1 })
        })
            .then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    setData({ ...data.data });
                }
            });
    }

    const onRefresh = async () => {
        getData({});
    };

    const onEndReached = async () => {
        const { page, records } = data;
        fetch("http://api.shanghaim.net/mock/28/api/message/list", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ page: page + 1 })
        })
            .then(response => response.json())
            .then(response => {
                if (response.code) {
                    setData({
                        ...response.data,
                        records: [...records, ...response.data.records]
                    });
                }
            });
    };

    const { records, page, pages } = data;
    return (
        <div>
            <div style={{ height: 80, background: "red" }}>nav</div>
            <Listview
                dataSource={records}
                Item={Item}
                onRefresh={onRefresh}
                onEndReached={onEndReached}
                hasMore={page !== 0 && page !== pages}
            />
        </div>
    );
}

function Item(props) {
    const { content, title } = props;
    return (
        <div>
            <div>{title}</div>
            <div>{content}</div>
        </div>
    );
}
export default hot(module)(App);
