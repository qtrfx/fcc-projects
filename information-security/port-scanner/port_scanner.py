import socket
import common_ports
import ipaddress
import re

commonPorts = common_ports.ports_and_services


def get_open_ports(target, port_range, verbose=False):
    host = ''
    open_ports = []
    if(re.findall('.[A-Za-z]{2,}$', target)):
        try:
            ip = socket.gethostbyname(target)
            host = target 
        except:
            return 'Error: Invalid hostname'
        
    else:
        try:
            host = socket.gethostbyaddr(target)[0]
            ip = str(ipaddress.ip_address(target))
        except:
            try:
                ip = str(ipaddress.ip_address(target))
            except:
                return 'Error: Invalid IP address'
        
    if host:   
        verboseString = 'Open ports for {} ({})\nPORT     SERVICE'.format(host, ip)
    else:
        verboseString = 'Open ports for {}\nPORT     SERVICE'.format(ip)

    portsToScan = list(range(port_range[0], port_range[1] + 1))

    for port in portsToScan:
        socketServer = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        socketServer.settimeout(0.025)
        if socketServer.connect_ex((ip, int(port))):
            socketServer.close()
            continue
            
        else:
            open_ports.append(int(port))
            if verbose:
                verboseString += '\n{}'.format(str(port))
                if port in commonPorts:
                    verboseString += ' ' * (9 - len(str(port))) + commonPorts[port]
        socketServer.close()
        
    if verbose:
        return verboseString
    else:
        return open_ports
