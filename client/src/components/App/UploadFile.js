import React, { Component } from 'react'
import { withRouter } from 'react-router'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Card, Upload, Button } from 'antd'

class UploadFile extends Component {
  state = {
    fileList: []
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitting')
    this._uploadFile(this.state.fileList)
  }

  render() {
    const uploadProps = {
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file)
          const newFileList = fileList.slice()
          newFileList.splice(index, 1)
          return {
            fileList: newFileList,
          }
        })
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }))
        return false
      },
      fileList: this.state.fileList,
    }
    return (
      <Card
        className='upload-card'
      >
        <div className='buttons-row'>
          <Upload {...uploadProps}>
            <Button
              icon='picture'
            />
          </Upload>
          <Button
            type='primary'
            onClick={this.handleSubmit}
            className='submit-btn'
          >
            Submit
          </Button>
        </div>
      </Card>
    )
  }

  _uploadFile = (files) => {
    let file = files[0]
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

export default withRouter(graphql(UPLOAD_MUTATION, { name: 'uploadMutation' })(UploadFile))