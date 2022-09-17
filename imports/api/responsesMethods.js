import { Meteor } from 'meteor/meteor';
import { ResponsesCollection } from './responses';

Meteor.methods({
    'responses.insert' (r) {

        ResponsesCollection.insert({
            ...r,
            createdAt: new Date,
        })
    },

    'responses.remove' (rId) {
        ResponsesCollection.remove(rId);
    },


});