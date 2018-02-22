import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'

const withErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    state = {
      err: null
    }

    componentWillMount() { 
      this.reqInterceptor = axios.interceptors.request.use(req => { 
        this.setState({ err: null })
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, err => { 
        this.setState({ err: err })
      });
    }

    componentWillUnmount() { 
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({err: null})
    }

    render() { 
      return (
        <Aux>
          <Modal
            show={this.state.err}
            modalClose={this.errorConfirmedHandler}>
            { this.state.err ? this.state.err.message : null }
          </Modal>
          <WrapperComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler;