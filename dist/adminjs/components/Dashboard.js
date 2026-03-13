import React, { useEffect, useState } from 'react';
import { H1, H2, Table, TableHead, TableRow, TableBody, TableCell } from '@adminjs/design-system';
import { ApiClient, useCurrentAdmin } from 'adminjs';
export default function Dashboard() {
    const [resources, setResources] = useState();
    const [currentAdmin] = useCurrentAdmin();
    const api = new ApiClient();
    useEffect(() => {
        fetchDashboardData();
    }, []);
    async function fetchDashboardData() {
        const res = await api.getDashboard();
        //console.log(res.data)
        setResources(res.data);
    }
    return (React.createElement("section", null,
        React.createElement(H1, null,
            "Seja bem-vindo(o), ",
            currentAdmin?.firstName),
        React.createElement("section", { style: { backgroundColor: '#FFF', padding: '1.5rem' } },
            React.createElement(H2, null, "Resumo"),
            React.createElement(Table, null,
                React.createElement(TableHead, null,
                    React.createElement(TableRow, { style: { backgroundColor: '#FF0043' } },
                        React.createElement(TableCell, { style: { color: "#FFF" } }, "Recurso"),
                        React.createElement(TableCell, { style: { color: "#FFF" } }, "Registros"))),
                React.createElement(TableBody, null, resources ?
                    Object.entries(resources).map(([resource, count]) => (React.createElement(TableRow, { key: resource },
                        React.createElement(TableCell, null, resource),
                        React.createElement(TableCell, null, count))))
                    :
                        React.createElement(React.Fragment, null))))));
}
