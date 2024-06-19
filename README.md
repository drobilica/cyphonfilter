# CyphonFilter
General cypher toolchain for generating passwords, base64, and certificates online privately
- UI will be done it tailwind, vivid Darcula theme
- UI should have tabs on the left side from which you can choose individual tool from toolchain like (ssh key generator,password generator,base64 encode/decode, encrypt text up to 1000 characters )
- Uses vite as bundler
- 

### Stories

- Users should be able to use it without logging in 

### Stages 

- Stage 1 
	- generate (in-browser) 
		- SSH key pair (make it downloadable)
    		- Choose type of encryption like RSA ECDSA... RSA is default
			- choose if that ssh key should be password protected (optional)
			- choose name  (optional)
		- Passwords (uppercase/lowercase, alphanumeric, symbols, length 8/16 chars )
			- Slider which sets the length of the password
			- checkboxes that set if special chars should be used / numbers etc
		- Base64 encode/decode
			- put in plaintext to encode to base64
			- put in base64 to decode to base64
		- Encrypt text ( up to 1000 chars)
    		- Encrypts text with provided string (optionally there should be a button to generate random string)

- Stage 2 
	- Persistent sessions
		- save previously generated passwords, keys and so on (on the right side of the pane)
	- Login/Signup
		- Something similar to duckduckgo system

- Stage 3 
	- Cloud storage with encryption at-rest	
	- share cyphers and keys via link without logging in 
	- Smartphone integration
		- Android/iOS app with same funcionality 