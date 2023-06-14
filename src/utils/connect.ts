import BaseComponent from './block/block'
import store, { StoreEvents } from './store'
import { isEqual } from './isEqual'
import { Indexed } from './types'

function connect (Component: typeof BaseComponent, mapStateToProps: (state:Indexed) => Indexed) {
  return class extends Component {
    constructor(props:Indexed) {
      let state:Indexed = mapStateToProps(store.getState())

      // @ts-ignore
      super({ ...props, ...state })

      store.on(StoreEvents.Updated, () => {
        const newState:Indexed = mapStateToProps(store.getState())

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
