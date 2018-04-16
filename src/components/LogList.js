import React, { Component } from 'react';
import { ScrollView } from 'react-native';

class LogList extends Component {
    state = { routes: [] };

    renderRoutes() {
        return this.state.routes.map(route =>
            <AlbumDetail key={album.title} album={album} />);

    }

    render() {
        return (
            <ScrollView>
                {this.renderRoutes}
            </ScrollView>
        );
    }
}

export default LogList;

