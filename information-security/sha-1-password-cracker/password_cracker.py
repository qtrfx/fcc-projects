import hashlib

sha1 = hashlib.sha1

salts = open('known-salts.txt')
passwords = open('top-10000-passwords.txt')
saltList = []
passwordList = []

for line in salts:

    saltList.append(line.rstrip())

for line in passwords:
    
    passwordList.append(line.rstrip())



def crack_sha1_hash(hash, use_salts=False):
    

    for password in passwordList:

        if use_salts is True:
            for salt in saltList:
                prependPassword = (salt + password).encode('utf-8')
                appendPassword = (password + salt).encode('utf-8')
                
                prependHash = sha1(prependPassword).hexdigest()
                appendHash = sha1(appendPassword).hexdigest()

                if prependHash == hash or appendHash == hash :
                    return password
                    
        generatedHash = sha1(password.encode('utf-8')).hexdigest()
        if generatedHash == hash :
            return password


    return 'PASSWORD NOT IN DATABASE'
    