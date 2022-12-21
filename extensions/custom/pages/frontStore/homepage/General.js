import React, {useEffect, useState} from 'react';
const base = 'https://vcb.dientu.space/';

const General = () => {
    let [inf, setInf] = useState([]);
    let [inf2, setInf2] = useState([]);
    let [inf3, setInf3] = useState({});
    useEffect(() => {
        fetch(base + '1').then(res => res.text())
            .then(txt => {
                let p = new DOMParser();
                let doc = p.parseFromString(txt, 'application/xml');
                let nodes = Array.from(doc.querySelectorAll('Exrate'));
                let inf = nodes.map(d => {
                    let code = d.getAttribute('CurrencyCode');
                    let name = d.getAttribute('CurrencyName');
                    let trans = d.getAttribute('Transfer');
                    let sell = d.getAttribute('Sell');
                    return {code, name, trans, sell};
                });
                setInf(inf);
            })
    }, []);
    
    useEffect(() => {
        fetch(base + '2').then(res => res.text())
            .then(txt => {
                let p = new DOMParser();
                let doc = p.parseFromString(txt, 'application/xml');
                let arr = Array.from(doc.querySelectorAll('item'));
                let inf = arr.map(el => {
                    let title = el.querySelector('title').getInnerHTML();
                    window.x = el.querySelector('title').getInnerHTML();
                    let desc = el.querySelector('description').getInnerHTML().replace('<![CDATA[', '').replace(']]>', '');
                    let descParsed = new DOMParser().parseFromString(desc, 'text/html').body.innerText;
                    let date = el.querySelector('pubDate').getInnerHTML();
                    let link = el.querySelector('link').getInnerHTML();
                    return { title, desc: descParsed, date, link };
                })
                setInf2(inf);
            })
    }, []);
    
    useEffect(() => {
        fetch(base + '3')
            .then(res => res.json())
            .then(json => setInf3(json));
    }, [])
    return (
        <div>
            <div className="flex flex-row gap-2">
                <div className="basis-4/12">
                    <div className="overflow-y-scroll" style={{ height: '20rem' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Tiền tệ</th>
                                    <th>Chuyển khoản<br />Bán</th>
                                </tr>
                                </thead>
                            <tbody>
                            {inf.map((r, i) => {
                                return (
                                    <tr key={r.code}>
                                        <td>
                                            <b>{r.code}</b>
                                            <br />{r.name}
                                        </td>
                                        <td>{r.trans}<br />{r.sell}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <div style={{ height: '10rem' }}>
                        <table>
                            <tbody>
                            <tr>
                                <th>Nhiệt độ</th>
                                <th>{inf3.main?.temp}</th>
                            </tr>
                            <tr>
                                <th>Độ ẩm</th>
                                <th>{inf3.main?.humidity}%</th>
                            </tr>
                            <tr>
                                <th>Tốc độ gió</th>
                                <th>{inf3.wind?.speed} km/h</th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="overflow-y-scroll basis-8/12" style={{ height: '40rem' }}>
                    <table>
                        <thead>
                        <tr>
                            <th>Thời gian</th>
                            <th>Tiêu đề</th>
                            <th>Nội dung</th>
                        </tr>
                        </thead>
                        <tbody>
                        {inf2.map(r => {
                            return <tr key={r.desc}>
                                <td>{new Date(r.date).toLocaleString()}</td>
                                <td>
                                    <a href={r.link} className={'underline'}>
                                        {r.title}
                                    </a>
                                </td>
                                <td>{r.desc}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default General;
export const layout = {
    areaId: 'content',
    sortOrder: 0
}

