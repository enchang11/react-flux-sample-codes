"use strict";

var React = require('react');
var Channel = require('./Channel.react');

var Place = React.createClass({

    propTypes: {
        placeElementId: React.PropTypes.string.isRequired,
        channels: React.PropTypes.array.isRequired
    },

    getInitialState: function () {
        return {
            channels: this.props.channels
        };
    },

    render: function () {
        var channels = this.state.channels.map(function (channel) {
            return (
                <Channel
                    key={channel.rowId}
                    rowId={channel.rowId}
                    auctionID={channel.auctionID}
                    placeID={channel.placeID}
                    placeName={channel.placeName}
                    channel={channel.channel}
                    carInfo={channel.carInfo} />);
        });

        return (
            <div id={this.props.placeElementId} className="place">
                {channels}
            </div>
        );
    }
});

module.exports = Place;