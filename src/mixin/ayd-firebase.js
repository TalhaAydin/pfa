import { dedupingMixin } from '../../../@polymer/polymer/lib/utils/mixin.js';
if (!window.Aydin) {
  window.Aydin = {};
}

// TODO: Is this mixin really needed?
Aydin.FirebaseMixin = (function FirebaseMixin(firebase) {
  return dedupingMixin(base => class extends base {
    get database() {
      return firebase.database();
    }

    nodeRef(nodeLocation) {
      return this.database.ref(nodeLocation);
    }

    bindNode(nodeLocation, propertyToBind) {
      const ref = this.nodeRef(nodeLocation);

      ref.on('child_added', (data) => {
        this.push(propertyToBind, { key: data.key, data: data.val() });
      });

      ref.on('child_removed', (data) => {
        this.splice(propertyToBind, this.get(propertyToBind).findIndex(e => data.key === e.key), 1);
      });

      // @TODO Also handle changes
    }

    onChildNodeAdded(nodeLocation, callback) {
      this.nodeRef(nodeLocation).on('child_added', callback);
    }

    onChildNodeRemoved(nodeLocation, callback) {
      this.nodeRef(nodeLocation).on('child_removed', callback);
    }

    onChildNodeChanged(nodeLocation, callback) {
      this.nodeRef(nodeLocation).on('child_changed', callback);
    }

    pushNode(nodeLocation, varToPush) {
      return this.nodeRef(nodeLocation).push().set(varToPush);
    }

    removeNode(nodeLocation) {
      return this.nodeRef(nodeLocation).remove();
    }

    updateNodes(updates) {
      return this.nodeRef().update(updates);
    }
  });
}(window.firebase));
