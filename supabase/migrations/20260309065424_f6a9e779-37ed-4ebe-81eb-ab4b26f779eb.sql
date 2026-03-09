
CREATE POLICY "Users can delete attachments"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'order-attachments'
    AND auth.uid() IS NOT NULL
    AND (
      has_role(auth.uid(), 'super_admin'::app_role)
      OR (storage.foldername(name))[1] IN (
        SELECT id FROM public.orders WHERE creato_da_user_id = auth.uid()
      )
    )
  );
