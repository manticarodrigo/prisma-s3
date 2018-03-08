import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class UploadFile extends React.Component {
  state = {
    file: null,
  }

  render() {
    return (
      <div>
        <form>
          <h1>Upload File</h1>
          <input
            type='file'
            accept='image/*'
            onChange={(event)=> { 
              this._uploadFile(event) 
            }}
            onClick={(event)=> { 
              event.target.value = null
            }}
          />
        </form>
      </div>
    )
  }

  _uploadFile = (event) => {
    const files = event.target.files
    const file = files[0]
    this.props.uploadMutation({
      variables: {
        file
      }
    }).catch(error => {
      console.log(error)
    })
    this.props.history.push(`/`)
  }
}

const UPLOAD_MUTATION = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(
      file: $file
    ) {
      id
    }
  }
`

const UploadFileWithMutation = graphql(UPLOAD_MUTATION, {
  name: 'uploadMutation', // name of the injected prop: this.props.uploadMutation...
})(UploadFile)

export default withRouter(UploadFileWithMutation)
