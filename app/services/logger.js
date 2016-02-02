import Ember from 'ember';

const {
  copy,
  merge
} = Ember;

export default Ember.Service.extend({
  events: [],

  log(obj) {
    this.get('events').pushObject(merge({ time: new Date() }, obj));
    this.saveLogs();
  },

  saveLogs() {
    const events = this.get('events');

    if (events.length < 5) {
      return;
    }

    // sent next packet of events to a backend
    const log = {
      app: 'emberlogger',
      events: copy(events),
      locale: navigator.language,
      time: new Date(),
      userAgent: navigator.userAgent
    };

    console.log(log); // emulated instead of actual sending

    events.clear();
  }
});
