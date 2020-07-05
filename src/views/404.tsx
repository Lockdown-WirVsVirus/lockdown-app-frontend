import React from "react";
import Header from "../components/Header";
import {
    Container,
    Card,
    CardContent,
    Typography
} from "@material-ui/core";

const Page404 = () => {

    return (
        <div>
            <Header title="Page not found :-("></Header>
            <Container>
                <Card>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom>
                            Seite nicht gefunden
                        </Typography>
                        <Typography color="textSecondary">
                            Da Passierscheine immer personenbezogen sind, benötigen wir ein paar Daten über dich.
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default Page404;
