@include('header')
<div class="container">
<h3>update category</h3>
<form method="post" action="{{url('update')}}" enctype="multipart/form-data">
@csrf
<input type="hidden" name="cId" value="{{$object['catId']}}">
  <div class="mb-3">
  <label for="" class="form-label">update category</label>
    <input type="text" class="form-control"  name="cName"  value="{{$object['catName']}}" >
    <div  class="form-text"></div>
  </div>
  <div class="mb-3">
    <label for="" class="form-label">image</label>
    <input type="file" class="form-control" name="cFile" >
    <img src="../assets/categories/{{$object['catImage']}}" width="90" alt="">
  
    
    <button type="submit" class="btn btn-primary">Update Categories</button>
</form>
</div>

@include('footer')
