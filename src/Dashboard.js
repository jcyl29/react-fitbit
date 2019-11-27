import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Badges from './Badges';
import dummyData from './dummyData';
import Friends from './Friends';
import LifetimeStats from './LifetimeStats';
import TimeSeriesBarChart from './TimeSeriesBarChart';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = dummyData;
  }

  fetchFitbitData(url, fitbitToken, stateKey) {
    axios({
      method: 'get',
      url: 'https://api.fitbit.com/1/user/-/' + url,
      headers: { Authorization: 'Bearer ' + fitbitToken },
      mode: 'cors'
    })
      .then(response => {
        console.log(response);
        this.setState({ [stateKey]: response.data });
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    if (window.location.hash) {
      let fitbitToken = window.location.hash
        .slice(1)
        .split('&')[0]
        .replace('access_token=', '');

      this.setState({ loggedIn: true });

      this.fetchFitbitData('profile.json', fitbitToken, 'user');
      this.fetchFitbitData('activities.json', fitbitToken, 'lifetimeStats');
      this.fetchFitbitData('badges.json', fitbitToken, 'badges');
      this.fetchFitbitData(
        'activities/steps/date/today/1m.json',
        fitbitToken,
        'steps'
      );
      this.fetchFitbitData(
        'activities/distance/date/today/1m.json',
        fitbitToken,
        'distance'
      );
      this.fetchFitbitData('friends/leaderboard.json', fitbitToken, 'friends');
    }
  }

  render() {
    const clientId = '22BBTX';
    const redirectUri = 'http://localhost:3000/'; // where to redirect after logging in

    return (
      <div className="container">
        <header className="text-center">
          <span className="pull-right">{this.state.user.user.displayName}</span>
          <h1 className="page-header">React Fit</h1>
          <p className="lead">Your personal fitness dashboard</p>
        </header>

        {!this.state.loggedIn && (
          <div className="row text-center">
            <a
              href={`https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800`}
            >
              Log in with fitbit
            </a>
          </div>
        )}

        <div className="row">
          <div className="col-lg-3">
            <LifetimeStats lifetimeStats={this.state.lifetimeStats} />
            <Badges badges={this.state.badges} />
          </div>

          <div className="col-lg-6">
            <TimeSeriesBarChart
              data={this.state.steps['activities-steps']}
              title="Steps"
              yMax={1000}
            />
            <TimeSeriesBarChart
              data={this.state.distance['activities-distance']}
              title="Distance (kilometers)"
              yMax={2}
            />
          </div>

          <div className="col-lg-2 col-lg-offset-1">
            <Friends friends={this.state.friends.friends} />
          </div>
        </div>
        <pre>{JSON.stringify(this.state, undefined, 2)}</pre>
      </div>
    );
  }
}

export default Dashboard;
