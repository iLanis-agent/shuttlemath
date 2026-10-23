import json, random
def dec(n, p=2):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def runs(r, s):
    k = -(-r//s)
    return f"The {pl(r,' rider',' riders')} at {pl(s,' seat',' seats')} a run make {pl(k,' run',' runs')}, the last run carrying {r-(k-1)*s}."
def span(r, s, q, g):
    k = -(-r//s); tot = k*q + (k-1)*g
    h, m = tot//60, tot%60
    return f"The {pl(k,' run',' runs')} at {pl(q,' minute',' minutes')} a round trip with {pl(k-1,' turnaround',' turnarounds')} of {pl(g,' minute',' minutes')} take {tot} minutes, {pl(h,' hour',' hours')} {pl(m,' minute',' minutes')}."
def mileage(r, s, mi, g):
    k = -(-r//s); tm = k*mi
    g2 = (200*tm + g)//(2*g)
    return f"The {pl(k,' run',' runs')} of {pl(mi,' mile',' miles')} cover {pl(tm,' mile',' miles')}, and at {pl(g,' mile',' miles')} a gallon that is {dec(g2)} {'gallon' if g2==100 else 'gallons'}."
def cost(r, s, mi, g, pc):
    k = -(-r//s); tm = k*mi
    cc = (2*tm*pc + g)//(2*g)
    pr = (2*cc + r)//(2*r)
    return f"The {pl(tm,' mile',' miles')} at {pl(g,' mile',' miles')} a gallon and ${dec(pc)} a gallon come to ${dec(cc)}, ${dec(pr)} a rider."
random.seed(773)
R = random.randint
cases = [
 dict(fn="runs", args=["116","24"], expect=runs(116,24)),
 dict(fn="span", args=["116","24","40","10"], expect=span(116,24,40,10)),
 dict(fn="mileage", args=["116","24","18","22"], expect=mileage(116,24,18,22)),
 dict(fn="cost", args=["116","24","18","22","3.85"], expect=cost(116,24,18,22,385)),
 dict(fn="runs", args=["1","1"], expect=runs(1,1)),
 dict(fn="runs", args=["120","24"], expect=runs(120,24)),
 dict(fn="span", args=["1","1","1","0"], expect=span(1,1,1,0)),
 dict(fn="mileage", args=["1","1","1","1"], expect=mileage(1,1,1,1)),
 dict(fn="mileage", args=["24","24","22","22"], expect=mileage(24,24,22,22)),
 dict(fn="cost", args=["1","1","1","1","0.01"], expect=cost(1,1,1,1,1)),
]
for _ in range(20):
    r,s=R(1,100000),R(1,100); cases.append(dict(fn="runs", args=[str(r),str(s)], expect=runs(r,s)))
for _ in range(20):
    r,s,q,g=R(1,100000),R(1,100),R(1,600),R(0,120); cases.append(dict(fn="span", args=[str(r),str(s),str(q),str(g)], expect=span(r,s,q,g)))
for _ in range(20):
    r,s,mi,g=R(1,100000),R(1,100),R(1,500),R(1,100); cases.append(dict(fn="mileage", args=[str(r),str(s),str(mi),str(g)], expect=mileage(r,s,mi,g)))
for _ in range(25):
    r,s,mi,g,p=R(1,100000),R(1,100),R(1,500),R(1,100),R(1,9999); cases.append(dict(fn="cost", args=[str(r),str(s),str(mi),str(g),dec(p)], expect=cost(r,s,mi,g,p)))
errs=[["runs",["0","24"]],["runs",["100001","24"]],["runs",["3.5","24"]],["runs",["116","0"]],["runs",["116","101"]],["runs",["116","x"]],
 ["span",["116","24","0","10"]],["span",["116","24","601","10"]],["span",["116","24","40","121"]],["span",["116","24","40","-1"]],
 ["mileage",["116","24","0","22"]],["mileage",["116","24","501","22"]],["mileage",["116","24","18","0"]],["mileage",["116","24","18","101"]],
 ["cost",["116","24","18","22","0"]],["cost",["116","24","18","22","100"]],["cost",["116","24","18","22","3.855"]],["cost",["116","24","18","22","x"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
