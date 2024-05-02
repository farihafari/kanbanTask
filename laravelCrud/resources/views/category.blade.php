@include('header')
<div class="container">
<h3>Add category</h3>
<form method="post" enctype="multipart/form-data">
@csrf
  <div class="mb-3">
  <label for="" class="form-label">add category</label>
    <input type="text" class="form-control"  name="cName" >
    <div  class="form-text">
    @error('cName')
              <small id="helpId" class="text-danger">{{$message}}</small> 
              @enderror
    </div>
  </div>
  <div class="mb-3">
    <label for="" class="form-label">image</label>
    <input type="file" class="form-control" name="cFile" >
    @error('cFile')
              <small id="helpId" class="text-danger">{{$message}}</small> 
              @enderror
    </div>

    
  <button type="submit" class="btn btn-primary mt-3">Submit</button>
</form>
</div>
@if(session("AddCate"))
            <script>
                alert('category add Successfully')
            </script>
            @endif
@include('footer')
