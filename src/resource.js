import resourceItem from './resourceItem'

const resource = ({ path, createRequester }) => {
  let prefix = ''
  let subresources = {}

  const methods = []
  const instanceMethods = {}
  const getPath = () => `${prefix}${path}`

  const resource = (id) => resourceItem({
    id,
    path,
    subresources,
    instanceMethods,
    createRequester: createRequester
  })

  let requester = createRequester({ path: getPath() })

  resource.setPrefix = (pfx) => {
    prefix = `${pfx}/`
    requester = createRequester({ path: getPath() })
  }

  resource.subresource = (newSubsresources) => {
    subsresources = { ...subsresources, ...newSubsresources }
  }

  resource.collection = (methodName, method) => {
    resource[methodName] = function() {
      return method(requester, ...arguments)
    }
  }

  resource.member = (methodName, method) => {
    instanceMethods[methodName] = method
  }

  return resource
}

export default resource
