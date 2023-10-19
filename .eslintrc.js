module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": 
    - 'airbnb-base'
    - 'plugin:jest/recommended',
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "no-console": 0,
  "import/extensions": 
    - "error"
    - "ignorePackages"
    - "js: always"
    }
}

