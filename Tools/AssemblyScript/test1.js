function test1(){
    var color3 = new BABYLON.Color3(0.0001,0.0001,0.0001);
    var color3n2 = new BABYLON.Color3(0.0001,0.0001,0.0001);
    color3.addWasmStyle = function()
    {
      exports.add3Pairs(this.r,0.0001,this.g,0.0001,this.b,0.0001);
      this.r = readWasmMemAsF64[0];
      this.g = readWasmMemAsF64[1];
      this.b = readWasmMemAsF64[2];
      return this;
    }
    color3.addJS = function()
    {
      this.r += 0.0001;
      this.g += 0.0001;
      this.b += 0.0001;
      return this;
    }

    console.time("js add");
    for(let i=0; i<10000000; i++)
    {
      color3.addJS();
    }
    console.timeEnd("js add");
    //-----
    console.time("wa add");
    for(let i=0; i<10000000; i++)
    {
      color3.addWasmStyle();
    }
    console.timeEnd("wa add");
    color3.superMultiply = function()
    {
      exports.superMultiply(this.r, 0.0001, 1.31140, 0.0051, 1.311210, 0.0701, 1.329, 10.12144);
      this.r = readWasmMemAsF64[0];
      return this;
    }
    color3.superMultiplyJS = function()
    {
      this.r = this.r * 0.0001 * 1.31140 * 0.0051 * 1.311210 * 0.0701 * 1.329 * 10.12144;
      return this;
    }
    console.time("js sm");
    for(let i=0; i<10000000; i++)
    {
      color3.superMultiplyJS();
    }
    console.timeEnd("js sm");
    //-----
    console.time("wa sm");
    for(let i=0; i<10000000; i++)
    {
      color3.superMultiply();
    }
    console.timeEnd("wa sm");

    color3.superAdd = function()
    {
      exports.superAdd(this.r, 0.0001, 1.31140, 0.0051, 1.311210, 0.0701, 1.329, 10.12144);
      this.r = readWasmMemAsF64[0];
      return this;
    }
    color3.superAddJS = function()
    {
      this.r = this.r + 0.0001 + 1.31140 + 0.0051 + 1.311210 + 0.0701 + 1.329 + 10.12144;
      return this;
    }

    console.time("js sa");
    for(let i=0; i<10000000; i++)
    {
      color3.superAddJS();
    }
    console.timeEnd("js sa");
    //-----
    console.time("wa sa");
    for(let i=0; i<10000000; i++)
    {
      color3.superAdd();
    }
    console.timeEnd("wa sa");
}