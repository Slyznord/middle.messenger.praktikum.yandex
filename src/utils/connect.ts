import BaseComponent from './block/block'
import store, { StoreEvents } from './store'
import { isEqual } from './isEqual'
import { Indexed } from './types'

function connect (Component: typeof BaseComponent, mapStateToProps: (state:object) => object) {
  return class extends Component {
    constructor(props:Indexed) {
      let state:object = mapStateToProps(store.getState())

      super('div', { ...props, ...state })

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState())

        if (!isEqual(state, newState)) {
          this.setProps({ ...newState })
        }

        state = newState
      })
    }

    storeUpdated () {}
  }
}

export default connect